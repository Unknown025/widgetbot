import styled from '@emotion/styled'

export const Root = styled.div`
  transition: opacity 0.2s ease;
  opacity: ${(props: any) => (props.theme.visible ? 1 : 0)};
  pointer-events: ${(props: any) => !props.theme.visible && 'none'};

  & :not(svg|*) {
    all: unset;
  }

  & * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
`
