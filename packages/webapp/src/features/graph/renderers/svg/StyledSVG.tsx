import styled from '@emotion/styled'
import { circleColor } from '@shared/helpers/circleColor'
import { ColorModeProps, mode } from '@utils/colorMode'
import { CirclesGraphViews } from '../../types'

type SVGProps = ColorModeProps & {
  view: CirclesGraphViews
  selectedCircleId?: string
  width: number
  height: number
  focusWidth: number
  focusHeight: number
}

export const StyledSVG = styled.svg<SVGProps>`
  font-family: var(--chakra-fonts-circles);
  font-size: 8px;
  font-weight: 600;
  fill: ${mode('#1a202c', 'rgba(255, 255, 255, 0.92)')};
  user-select: none;

  --circle-cursor: pointer;
  --member-pointer-events: auto;
  --graph-width: ${(p) => p.focusWidth};
  --graph-height: ${(p) => p.focusHeight};
  --graph-min-size: ${(p) => Math.min(p.focusWidth, p.focusHeight)};
  --depth-color-variation: 5%;

  circle {
    fill: transparent;
    cursor: var(--circle-cursor);
  }

  .type-Circle,
  .type-Member {
    circle {
      fill: ${(p) =>
        circleColor(
          mode(
            `calc(94% - (var(--depth) - 1) * var(--depth-color-variation))`, // Light theme
            `calc(16% + (var(--depth) - 1) * var(--depth-color-variation))` // Dark theme
          )(p),
          'var(--hue)'
        )};
    }

    &[data-hover] > circle {
      stroke: ${(p) =>
        circleColor(
          mode(
            `calc(88% - (var(--depth) - 1) * var(--depth-color-variation))`,
            `calc(22% + (var(--depth) - 1) * var(--depth-color-variation))`
          )(p),
          'var(--hue)'
        )};
      stroke-width: calc(4 / var(--zoom-scale));
    }

    // Selected
    &.circle-${(p) => p.selectedCircleId} > circle {
      stroke: ${(p) =>
        circleColor(
          mode(
            `calc(75% - (var(--depth) - 1) * var(--depth-color-variation))`,
            `calc(35% + (var(--depth) - 1) * var(--depth-color-variation))`
          )(p),
          'var(--hue)'
        )};
      stroke-width: calc(4 / var(--zoom-scale));
    }

    &[data-dragging] > circle {
      filter: url(#${({ id }) => id}-shadow);
      fill-opacity: 0.5;
    }

    &[data-drag-target] > circle {
      stroke: ${(p) => circleColor(mode('20%', '80%')(p))};
      stroke-width: 3px;
    }
  }

  .type-Member {
    // Always show members on members view
    ${(p) =>
      p.view === CirclesGraphViews.Members ? 'opacity: 1 !important' : ''};
  }
`
