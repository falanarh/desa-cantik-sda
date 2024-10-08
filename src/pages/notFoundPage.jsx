import { Button, Result } from "antd";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" href="/">Back Home</Button>}
      />
    </div>
  );
};

export default NotFoundPage;
