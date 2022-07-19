const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(blogs[0].likes);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(7 + 5 + 12 + 10 + 2);
  });
});
