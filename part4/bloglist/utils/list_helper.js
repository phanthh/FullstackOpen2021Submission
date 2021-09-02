const _ = require("lodash");
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (acc, blog) => {
    return acc + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  const reducer = (acc, blog) => {
    return acc.likes > blog.likes ? acc : blog;
  };
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined;
  return _.chain(blogs)
    .map("author")
    .countBy()
    .map((v, k) => {
      return { author: k, blogs: v };
    })
    .maxBy("blogs")
    .value();
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined;
  return _.chain(blogs)
    .groupBy("author")
    .mapValues((bs) => _.sumBy(bs, (b) => b.likes))
    .map((v, k) => {
      return { author: k, likes: v };
    })
    .maxBy("likes")
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
