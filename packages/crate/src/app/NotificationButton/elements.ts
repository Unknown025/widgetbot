import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import Color from 'color'

import NotificationsOff from './icons/notifications-off'
import NotificationsOn from './icons/notifications-on'

export const Root = styled.button`
  position: fixed;
  z-index: 2147483000;
  cursor: pointer;
  outline: none;

  height: 56px;

  border-radius: 56px;
  border: none;
  padding: 0;
  transition: box-shadow 0.2s ease, background-color 0.3s ease, opacity 0.2s ease, transform 0.2s ease;

  animation: ${keyframes`
    from {
      transform: scale(0.1);
      opacity: 0;
    }
    to {
      transform: initial;
      opacity: 1;
    }
  `} 0.3s ease;

  ${({ theme }) => {
    const { x, y } = theme.coords

    return css({
      [x.axis]: x.offset,
      [y.axis]: y.offset
    })
  }};

  ${({ theme }) => {
    const color = Color(theme.options.color)

    return theme.open
      ? css`
          background-color: transparent;
        `
      : css`
          box-shadow: 0px 3px 5px -1px ${color.fade(0.7).toString()}, 0px 6px 10px 0px ${color.fade(0.86).toString()},
            0px 1px 18px 0px ${color.fade(0.88).toString()};
          background-color: ${theme.options.color};
        `
  }};

  ${({ theme }) => {
    const { x, y } = theme.coords

    return y.margin && x.margin
      ? css`
          @media (max-width: 500px) {
            border-${y.axis}-${x.axis}-radius: 50%;

            ${x.axis}: ${x.offset - x.margin + 2}px;
            ${y.axis}: ${y.offset - y.margin + 2}px;
          }
        `
      : null
  }};
`

export namespace Icons {
  export const Root = styled.div`
    width: 56px;
    height: 100%;
    border-radius: inherit;

    & > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: transform 0.16s linear, opacity 0.2s ease;
    }
  `

  export const NotificationsOffButton = styled(NotificationsOff)`
    padding: 19px;
    opacity: 0.6;
    border-radius: inherit;
    left: -35px;

    &:hover {
      opacity: 0.95;
    }

    ${({ theme }) =>
      !theme.open &&
      css`
        opacity: 0 !important;
        transform: rotate(30deg) scale(0);
      `};
  `

  export const NotificationsOnButton = styled(NotificationsOn)`
    padding: 19px;
    opacity: 0.6;
    border-radius: inherit;
    left: -35px;

    &:hover {
      opacity: 0.95;
    }

    ${({ theme }) =>
      !theme.open &&
      css`
        opacity: 0 !important;
        transform: rotate(30deg) scale(0);
      `};
  `
}
