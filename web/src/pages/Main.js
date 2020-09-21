import React from 'react';
import { Typography, Carousel } from 'antd';

const { Title, Paragraph} = Typography;

class Main extends React.Component {
    render(){
        return(
          <div style={{ paddingRight: '5%', paddingLeft: '5%'}}>
          <Typography>
            <Title style={{ paddingRight: '30%', paddingLeft: '40%', paddingTop: '3%'}}>OMatKo!!! 2020</Title>
            <Carousel autoplay>
            <div>
            <img
                alt="logo"
                src="http://prac.im.pwr.edu.pl/~omatko/wp-content/uploads/2019/11/foto-edycja-2019-3.jpg"
                size={'100%'}
                />
            </div>
            <div>
              <img
                alt="logo"
                src="http://prac.im.pwr.edu.pl/~omatko/wp-content/uploads/2019/01/DSC_0932.jpg"
                size={'100%'}
              />
            </div>
            <div>
            <img
                alt="logo"
                src="http://prac.im.pwr.edu.pl/~omatko/wp-content/uploads/2019/11/foto-edycja-2019-5.jpg"
                size={'100%'}
              />
            </div>
            </Carousel>
            
            <Title style={{ paddingRight: '10%', paddingLeft: '30%'}}>
            Dlaczego warto być z nami?
            </Title>
            <Paragraph style={{ paddingRight: '10%', paddingLeft: '10%', paddingTop: '3%'}}>
            Celem konferencji jest rozwój naukowy uczestników poprzez możliwość prezentacji interesujących zagadnień,
            wyników pierwszych badań czy dzielenie się pasją z innymi studentami. Tegoroczna edycja "OMatKo!!!"
            z pewnością będzie źródłem wielu inspiracji oraz przestrzenią do zawiązywania nowych kontaktów między ambitnymi młodymi ludźmi z różnych uczelni >>
            <Title style={{ paddingRight: '10%', paddingLeft: '30%', paddingTop: '3%'}}>Serdecznie zapraszamy!</Title>
            </Paragraph>
        </Typography>
        </div>
        );
  }
}

export default Main;
