import React from "react";
import { Typography, Divider } from "antd";
import Function from "./Function";

const { Title } = Typography;

class Functions extends React.Component {
  render() {
    return (
      <div>
        <Title style={{ textAlign: "center" }}>Co oferujemy?</Title>
        <Divider />
        <Function
          img={"/img/7881.jpg"}
          title={"Stwórz swój własny City Tour"}
          text={
            "Wykorzystaj swój wyjazd jak najlepeij! Stwórz City Toury na \
          poszczególne dni podróży, aby w efektywny sposób odwiedzić wszystkie najważniejsze atrakcje.\
          Zobacz trasę, którą musisz pokonać i już więcej nie obawiaj się, że się zgubisz."
          }
        />
        <Divider />
        <Function
          img={"/img/5556.jpg"}
          title={"Dziel się podróżami ze znajomymi"}
          text={
            "Dziel zaplanowane trasy z towarzyszami podróży, abyście mogli wspólnie decydowac o planach. "
          }
        />
        <Divider />
        <Function
          img={"/img/6595.jpg"}
          title={"Przechowuj historię swoich podróży"}
          text={
            "Zobacz ile już miejsc udało Ci sie odwiedzić. Przyjrzyj się statystykom - \
          Które kraje należą do najczęściej odwiedzanych? Czy odwiedziłeś juz wszystkie kontynenty? Który rok \
          był najobfitszy w podróże?"
          }
        />
      </div>
    );
  }
}

export default Functions;
