import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Form, Input, Button, Divider } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

export default class Subscribe extends React.Component {
  constructor() {
    super()
    this.state = { name: '', email: '', result: null }
  }

  handleSubmit = async (e) => {
    const result = await addToMailchimp(this.state.email, { FNAME: this.state.name })
    if (result.result === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Whoops, ${this.state.name} you're already subscribed!`
      })
    } else {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Thank you for subscribing ${this.state.name}!`,
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.setState({ result: result })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <Divider />
        <div className="subscribe">
          <h3 className="subscribeInfo">
            Like the article? Subscribe to get notified whenever a new article gets published!
          </h3>
          <Form name="subscribe" onFinish={this.handleSubmit} layout="inline">
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: 'Please input your email.' }]}
            >
              <Input prefix={<MailOutlined />} onChange={this.handleEmailChange} />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name.' }]}
            >
              <Input prefix={<UserOutlined />} onChange={this.handleNameChange} />
            </Form.Item>
            <br/>
            <Form.Item>
              <Button type="primary" htmlType="submit" shape="round">
                Subscribe
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* --- STYLES --- */}
        <style jsx>{`
          .subscribe {
            .subscribeInfo {
              text-align: center;
              padding-bottom: 20px;
            }
          }
          .ant-form .ant-form-inline {
            justify-content: center;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
