import { Helmet } from 'react-helmet';
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import countapi from 'countapi-js';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const list = [
        '保护好小腿',
        '老大来之前准备好Homebush买的橙汁和芒果汁',
        '奶酪多多地准备',
        '生蚝多多地准备',
        '去凯恩斯海底酒店',
        '去冰岛舔冰',
        '去蓝山泡温泉',
        '一起看好看的剧，看悬疑恐怖片',
        '去黄金海岸华纳影城',
        '去大阪华纳影城',
        '草莓多多地准备',
        '坐ferry看海港桥的落日',
        '买草莓奶油蛋糕',
        '吃火锅海底捞',
        '去马尔代夫水滑梯',
        '一起拼乐高',
        '去长沙吃美食',
        '去黄金海岸拍海绵宝宝和派大星',
        '吃西班牙小饭店',
        '做草莓熊盖饭',
        '一起去日本旅游',
        '因为宝宝一个人去看床上用品了，所以努力按摩一次',
        '带老大一起公司瞅瞅',
        '一起吃fishbowl',
        '一起吃公司前面的鸡肉薯条',
        '一起去郊游',
        '一起去海边晒太阳',
        '用海滩沙子把你盖起来',
        '一起去迪士尼',
        '一起去环球影城',
        '一起去长白山',
        '和你见第一次面',
        '... ...'
      ];
    list.forEach((item, idx) => {
      var _todos = todos;
      _todos.push(
        <MDBListGroupItem className="border-0 d-flex align-items-center ps-0" key={idx}>
          <MDBCheckbox
            name="flexCheck"
            value=""
            id={`flexCheck-${idx}`}
            className="me-3"
          />
          {item}
        </MDBListGroupItem>,
      );
      setTodos(_todos);
    });
    setLoad(true);

    countapi.hit('happy-birthday-gina.vercel.app', 'todosV4').then(res => {
      console.log('hit photo: ', res);
    });
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="./css/todos.css"></link>
      </Helmet>
      {load && (
        <section className="p-5 vh-100">
          <MDBContainer className="py-5 h-100">
            <MDBRow className="d-flex justify-content-center align-items-center">
              <MDBCol lg="8" xl="6">
                <MDBCard className="rounded-3">
                  <MDBCardBody className="p-4">
                    <h5>
                      <span className="h2 me-2">约定好要做的事情</span>{' '}
                      <MDBBadge className="mx-2" color="info">
                        TODOs
                      </MDBBadge>
                    </h5>
                    <p className="text-muted pb-2">2022.03.15</p>
                    <MDBListGroup className="rounded-0">
                      {todos}
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
    </>
  );
};

export default Todos;
