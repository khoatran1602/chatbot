import {
  findCodeInSentence,
  findListInSentence,
} from "../../src/components/utils";

describe("findCodeInSentence", () => {
  test("should find a code block in the sentence", () => {
    const sentence = "Here is some code: ```const x = 1;```";
    const codeBlock = findCodeInSentence(sentence);
    expect(codeBlock).toEqual("```const x = 1;```");
  });

  test("should return null if no code block is found", () => {
    const sentence = "This sentence does not contain a code block";
    const codeBlock = findCodeInSentence(sentence);
    expect(codeBlock).toBeNull();
  });
});

describe("findListInSentence", () => {
  test("should find a list in the sentence", () => {
    const sentence = "\n\n- item 1\n- item 2\n- item 3.";
    const list = findListInSentence(sentence);
    expect(list).toEqual("\n\n- item 1\n- item 2\n- item 3.");
  });

  test("should return null if no list is found", () => {
    const sentence = "This sentence does not contain a list";
    const list = findListInSentence(sentence);

    console.log("sentence:", sentence);
    console.log("list:", list);

    expect(list).toBeNull();
  });
});
