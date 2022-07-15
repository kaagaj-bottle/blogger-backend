const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum =
    blogs.length > 0
      ? blogs.reduce((sum, item) => {
          return sum + item.likes;
        }, 0)
      : 0;

  return sum;
};

module.exports = { dummy, totalLikes };
