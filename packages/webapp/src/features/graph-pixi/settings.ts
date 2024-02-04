import * as d3 from 'd3'

export default {
  memberValue: 10,
  padding: {
    circleWithoutSubCircle: 3,
    circleWithSubCircles: 3,
    circleWithSingleSubCircle: 5,
    membersCircle: 0.5,
  },
  zoom: {
    scaleExtent: [0.05, 5],
    transition: d3.easeCubicOut,
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
  addMenu: {
    marginTop: 56,
    padding: 10,
    spacing: 5,
    placeholderRadius: 25,
  },
  style: {
    fontFamily: 'basier_circle',
  },
}
