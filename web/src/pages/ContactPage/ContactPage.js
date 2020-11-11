import {useMutation, useFlash, Flash} from '@redwoodjs/web'
import {useForm} from 'react-hook-form'
import { Form, TextField, TextAreaField, Submit, FieldError, Label, FormError } from '@redwoodjs/forms'
import BlogLayout from "src/layouts/BlogLayout/BlogLayout";

const CREATE_CONSTANT = gql`
  mutation CreateContactMutation($input: CreateContactInput!){
    createContact(input: $input){
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({mode: "onBlur"})
  const {addMessage} = useFlash()
  const [create, {loading, error}] = useMutation(CREATE_CONSTANT, {
    onCompleted: () => {
      addMessage('Thank you for your submission!', {
        style: {backgroundColor: 'green', color: 'white', padding: '1rem'}
      })
      formMethods.reset()
    }
  });

  async function onSubmit(data){
    try{
      await create({variables: {input: data}})
    } catch(error){
      console.log(error)
    }
  }

  return (
    <BlogLayout>
      <Flash timeout={2000}/>
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <FormError error={error} wrapperStyle={{color: 'red', backgroundColor: 'lavenderblush'}}/>
        <Label name={"name"} errorClassName={'error'}>Name</Label>
        <TextField name={"name"} validation={{required: true}} errorClassName={'error'}/>
        <FieldError name={"name"} className={'error'}/>

        <Label name={"email"} errorClassName={'error'}>Email</Label>
        <TextField name={"email"} validation={{required: true}} errorClassName={'error'}/>
        <FieldError name={"email"} className={'error'}/>

        <Label name={"message"} errorClassName={'error'}>Message</Label>
        <TextAreaField name={"message"} validation={{required: true}} errorClassName={'error'}/>
        <FieldError name={"message"} className={'error'}/>

        <Submit disabled={loading }>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
