import { css, keyframes } from 'emotion'
import Channel, { Hash, MegaphoneIcon, NotificationsOffIcon, NotificationsOnIcon } from 'styled-elements/channel'
import styled from 'typed-emotion'

const fade = i => keyframes`
  from {
    transform: translateX(-${i * 7}px);
    opacity: 0;
  }
  to {
    transform: initial;
    opacity: 1;
  }
`

interface Props {
  selected: boolean
  unread: boolean
  order: number
}

export const Root = styled(Channel)<Props>`
  position: relative;
  text-decoration: none;
  user-select: none;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  display: flex;
  border-radius: 3px;
  flex-direction: row;
  font-size: 16px;
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  width: calc(100% - 16px);
  margin: 2px 8px;
  padding: 0 8px;
  background-color: ${({ selected, theme }) => (selected ? `${theme.colors._primary.fadeOut(0.9)} !important` : 'transparent')};
  color: ${({ selected, unread, theme }) =>
    selected || unread ? `${theme.colors._primary.fadeOut(0.1).toString()} !important` : theme.colors._primary.fadeOut(0.7).toString()};
  /* animation: ${({ order }) => fade(order)} 0.5s ease; */

  &:hover {
    background-color: ${({ theme }) => theme.colors._primary.fadeOut(0.96).toString()};
    color: ${({ theme }) => theme.colors._primary.fadeOut(0.3).toString()};
  }

  ${({ unread, theme }) =>
    unread &&
    css`
      &::before {
        position: absolute;
        display: block;
        content: '';

        left: -8px;
        top: 50%;
        transform: translateY(-50%);

        height: 8px;
        width: 4px;
        background-color: ${theme.colors._primary.fadeOut(0.4).toString()};
        border-radius: 0 6px 6px 0;
      }
    `}

  @media (max-width: 400px), (max-height: 340px) {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
  }
`

export const Hashtag = styled(Hash)`
  flex-shrink: 0;
  opacity: 0.6;
  height: 100%;
  width: 16px;
  margin-right: 7px;
`

export const Megaphone = styled(MegaphoneIcon)`
  flex-shrink: 0;
  opacity: 0.6;
  height: 100%;
  width: 16px;
  margin-right: 7px;
`

export const NotificationsOff = styled(NotificationsOffIcon)`
  flex-shrink: 0;
  opacity: 0.6;
  height: 100%;
  width: 32px;
  margin-right: 7px;
  &:hover {
    color: white;
  }
`

export const NotificationsOn = styled(NotificationsOnIcon)`
  flex-shrink: 0;
  opacity: 0.6;
  height: 100%;
  width: 32px;
  margin-right: 7px;
`

export const Name = styled.div`
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`

export const Pings = styled.div`
  display: inline-block;
  flex-shrink: 0;
  padding: 0 6px;
  margin: 7px 0;
  border-radius: 3px;

  font-size: 75%;
  line-height: 150%;
  font-weight: 500;

  background-color: #f04747;
  color: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 hsla(0, 0%, 100%, 0.15);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
`
