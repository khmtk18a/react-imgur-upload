import { Layout } from 'antd';
import UploadForm from './components/Upload';
import { Image, Card } from 'antd';
import { LocalStorageProps, connector } from './app/store';

const { Content, Footer } = Layout;

const App = connector((props: LocalStorageProps) => {
  const { items } = props.localStorage
  return (
    <Layout>
      <Content style={{ padding: '8px' }}>
        <Card>
          <UploadForm></UploadForm>
        </Card>
        <Card>
          <Image.PreviewGroup>
            {items.map((value, index) =>
              <Image src={value} key={index} width='50px'></Image>
            )}
          </Image.PreviewGroup>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2023 Created by KHMT K18A</Footer>
    </Layout>
  )
});

export default App
