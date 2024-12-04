import { FC, FormEventHandler } from 'react';

import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';

export interface IPostFormProps {}

export const PostForm: FC<IPostFormProps> = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <FormField label="Текст поста">
        <textarea className="post-form__input" />
      </FormField>

      <Button type="submit" title="Опубликовать" />
    </form>
  );
};
