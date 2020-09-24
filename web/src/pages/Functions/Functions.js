import React from 'react';
import { Typography, Divider } from 'antd';
import Function from './Function'

const { Title } = Typography;

class Functions extends React.Component {
  render() {
    return (
      <div style={{ paddingRight: '5%', paddingLeft: '5%' }}>
        <Title style={{ textAlign: 'center' }}>
          Co oferujemy?
        </Title>
        <Divider />
        <Function
          img={'/img/7881.jpg'}
          title={"Stwórz swój własny City Tour"}
          text={"Wykorzystaj swój wyjazd jak najlepeij! Stwórz City Toury na \
          poszczególne dni podróży, aby w efektywny sposób odwiedzić wszystkie najważniejsze atrakcje.\
          Zobacz trasę, którą musisz pokonać i już więcej nie obawiaj się, że się zgubisz."}
        />
        <Divider />
        <Function
          img={'/img/6595.jpg'}
          title={"Skorzystaj z kalkulatora kosztów"}
          text={"Zobacz ile pieniędzy potrzebujesz, aby zrealizwoać swoje plany. \
          Podlicz koszty transportu, noclegu oraz biletów wstępu. Suma potrzebna na odwiedzenie wszystkich zaplanowanych atrakcji \
          zostanie automatycznie naliczona na podstawie Twoich City Tourów. Możesz również połączyć swoje konto z Booking.com \
          i importować informacje o zakwaterowaniu."}
        />
        <Divider />
        <Function
          img={'/img/5556.jpg'}
          title={"Przechowuj historię swoich podróży"}
          text={"Zobacz na mapie ile już miejsc udało Ci sie odwiedzić. Możesz równiez przyjrzeć się statystykom - \
          która podróż kosztowała Cię najdrożej? Które kraje należą do najczęściej odwiedzanych? Czy odwiedziłeś juz wszystkie kontynenty?"}
        />
      </div>
    );
  }
}

export default Functions;