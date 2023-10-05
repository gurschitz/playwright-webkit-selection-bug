import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.setContent('<div id="container">lorem ipsum dolor sit amet</div>');

  await page.evaluate(() => {
    const element = document.getElementById("container") as HTMLDivElement;
    const textNode = element.firstChild as Text;

    const range = textNode.ownerDocument.createRange();
    range.setStart(textNode, 6);
    range.setEnd(textNode, 11);

    const selection = textNode.ownerDocument.defaultView?.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  });

  // the selection should stay the same even after 1 second passed
  await page.waitForTimeout(1000);

  const range = await page.evaluate(() => {
    const selection = document.getSelection();
    const range = selection?.getRangeAt(0);
    return {
      rangeCount: selection?.rangeCount,
      startOffset: range?.startOffset,
      endOffset: range?.endOffset,
    };
  });

  expect(range).toEqual({ rangeCount: 1, startOffset: 6, endOffset: 11 });
});
