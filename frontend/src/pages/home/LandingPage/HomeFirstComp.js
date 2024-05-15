/* eslint-disable global-require */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './index.css';

const HomeFirstComp = () => {
  return (
    <div className="HomeMainFirst">
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            lg={{ span: 8, offset: 2 }}
            md={{ span: 9, offset: 2 }}
            className="mb-4"
          >
            <p className="text-center text-white HomeH1Tag">
              WELCOME TO GRAND INDIA RESTAURANTS
            </p>
            <p id="h6" className="text-center text-white py-5">
              THE PERFECT CHOICE FOR YOUR RESTAURANT
            </p>
            <p className="text-center text-white " id="HomeH1Tag1">
              ITS TIME TO ENJOY THE{' '}
              <span style={{ color: 'orange' }}>FINER THINGS </span> IN LIFE.{' '}
            </p>
          </Col>
        </Row>
      </Container>
      {/* 
        <Image
          src={require('../../../assets/img/left.png')}
          className="HomeImg2"
        />
        <Image
          src={require('../../../assets/img/Right.png')}
          className="HomeImg1"
        /> */}
    </div>
  );
};

export default HomeFirstComp;
