// 결제 임팩트 알림의 urgent 판정 로직만 골라내서 검증하는 최소 스모크 테스트.
// script.js는 브라우저 ESM(firebase CDN import) + DOM 참조가 있어 통째로 require할 수 없으므로,
// 순수 함수 두 개(formatMoney, computeImpactNotificationContent)만 소스에서 잘라내 실행한다.
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const src = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

function extractFunction(name) {
  const start = src.indexOf(`function ${name}(`);
  if (start === -1) throw new Error(`${name} not found in script.js`);

  // 파라미터 목록 끝(')')을 먼저 찾는다 — 구조분해 파라미터의 '{'와
  // 함수 본문의 '{'를 혼동하지 않기 위함.
  let parenDepth = 0;
  let i = src.indexOf("(", start);
  for (; i < src.length; i++) {
    if (src[i] === "(") parenDepth++;
    if (src[i] === ")") {
      parenDepth--;
      if (parenDepth === 0) break;
    }
  }

  const braceStart = src.indexOf("{", i);
  let depth = 0;
  for (let j = braceStart; j < src.length; j++) {
    if (src[j] === "{") depth++;
    if (src[j] === "}") {
      depth--;
      if (depth === 0) return src.slice(start, j + 1);
    }
  }
  throw new Error(`unterminated function ${name}`);
}

// eslint-disable-next-line no-eval
eval(extractFunction("formatMoney"));
// eslint-disable-next-line no-eval
eval(extractFunction("computeImpactNotificationContent"));

// 평범한 결제: 여유돈의 20% 미만 소진 → 조용히
let r = computeImpactNotificationContent({ amount: 4500, beforeAvailable: 100000, afterAvailable: 95500 });
assert.strictEqual(r.urgent, false, "20% 미만 소진은 urgent가 아니어야 함");
assert.ok(r.body.includes("95,500"), "본문에 남은 여유돈이 표시돼야 함");

// 여유돈의 20% 이상을 갉아먹는 결제 → 경고
r = computeImpactNotificationContent({ amount: 30000, beforeAvailable: 100000, afterAvailable: 70000 });
assert.strictEqual(r.urgent, true, "20% 이상 소진은 urgent여야 함");

// 여유돈을 마이너스로 만드는 결제 → 무조건 경고
r = computeImpactNotificationContent({ amount: 5000, beforeAvailable: 3000, afterAvailable: -2000 });
assert.strictEqual(r.urgent, true, "여유돈이 마이너스가 되면 urgent여야 함");
assert.ok(r.body.includes("소진"), "마이너스일 때는 소진 경고 문구여야 함");

// beforeAvailable이 0 이하일 때 나눗셈으로 오류나지 않아야 함
r = computeImpactNotificationContent({ amount: 1000, beforeAvailable: 0, afterAvailable: -1000 });
assert.strictEqual(r.urgent, true);

console.log("test-impact-notification: OK");
