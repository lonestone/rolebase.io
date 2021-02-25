import * as d3 from 'd3'

export default {
  memberValue: 10,
  padding: {
    circle: 50,
    member: 1,
  },
  highlight: {
    transition: d3.easeCircleOut,
    duration: 150,
    increaseRadius: 5,
  },
  move: {
    transition: d3.easeCubicInOut,
    duration: 500,
  },
  remove: {
    transition: d3.easeQuadIn,
    duration: 150,
  },
}
