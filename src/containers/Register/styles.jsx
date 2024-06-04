import styled from "styled-components";
import BackgroundLogin from '../../assets/background-login.svg';
import Background from '../../assets/background.svg';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const LeftContainer = styled.div`
  background: url('${BackgroundLogin}');
  background-size: cover;
  background-position: center;

  height: 100%;
  width: 100%;
  max-width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
  max-width: 50%;

  background: url('${Background}');
  background-color: #1e1e1e;

  p{
    color: #fff;
    font-size: 18px;
    font-weight: 800;

    a{
      text-decoration: underline;
    }
  }
`;

export const Title = styled.h2`
  font-family: "Road Rage", sans-serif;
  font-size: 40px;
  color: #fff;
  margin-top: 10px;

  span {
    color: #9758a6;
    font-family: "Road Rage", sans-serif;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;

export const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
   width: 100%;

   input {
    width: 391.42px;
    height: 38.32px;
    background: #ffffff;
    box-shadow: 2px 2px 8px rgba(74, 144, 226, 0.19);
    //border: none;
    border-radius: 5px;
    padding-left: 10px;
    border: ${props => (props.error ? '2px solid #cc1717' : 'none')};
   }

   label {
     font-size: 18px;
     font-weight: 600;
     color: #fff;
   }

   p {
    font-size: 14px;
    line-height: 80%;
    color: #cf3057;
    font-weight: 600;
    height: 10px;
    margin-top: 2px;
   }
`;

export const ErrorMessage = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #cc1717;
  margin-top: 2px;
`



