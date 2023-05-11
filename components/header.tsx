import styled from 'styled-components'

export default function Header() {
  return (
    <div>
      <Positioner>
        <WhiteBackground>
          <Logo>TRIPSODA</Logo>
          <HeaderContents>커뮤니티</HeaderContents>
        </WhiteBackground>
      </Positioner>
    </div>
  )
}

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
`

const WhiteBackground = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`

// 해더의 내용
const HeaderContents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
`

// 로고
const Logo = styled.div`
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: rgb(0, 206, 124);
`
