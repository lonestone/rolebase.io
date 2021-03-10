import * as d3 from 'd3'

export default {
  memberValue: 10,
  fontSize: 10,
  padding: {
    circle: 30,
    membersCircle: 10,
    member: 1,
  },
  zoom: {
    scaleExtent: [0.1, 2],
    transition: d3.easeCubicInOut,
    duration: 500,
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
  addMenu: {
    marginTop: 56,
    padding: 10,
    spacing: 5,
    placeholderRadius: 25,
  },
}
