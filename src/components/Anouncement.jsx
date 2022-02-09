import styled from "styled-components";
const Container = styled.div`
    height: 30px;
    background-color: #fffb13;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Anouncement = () => {
  return (
    <Container>
        FREE SHIPPING & COD NATIONWIDE
    </Container>
  )
};

export default Anouncement;
