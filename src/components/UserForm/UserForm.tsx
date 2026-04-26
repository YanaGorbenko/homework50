import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import css from './UserForm.module.css';
type HobbiesValues =
  | 'reading'
  | 'films'
  | 'traveling'
  | 'sport'
  | 'music'
  | 'cooking'
  | 'videogames'
  | 'another';

interface FormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: {
    country: 'uk' | 'pl' | 'gr' | 'another';
    city: string;
    postalCode: string;
  };
  birthDate: Date | string;
  sex: 'male' | 'female' | 'another';
  hobbies: HobbiesValues[];
  description: string;
  agreement: boolean;
}

const initialValues: FormValues = {
  name: '',
  surname: '',
  email: '',
  phone: '+380',
  password: '',
  confirmPassword: '',
  address: {
    country: 'uk',
    city: '',
    postalCode: '',
  },
  birthDate: new Date().toISOString().split('T')[0],
  sex: 'male',
  hobbies: [],
  description: '',
  agreement: false,
};

const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'В імені має бути мінімум два символи')
    .required('Ім`я є обовя`зковим полем  '),
  surname: yup.string().required('Прізвище є обовя`зковим полем  '),
  email: yup
    .string()
    .email('Email має містити символ "@" та коректний формат')
    .required('Електронна пошта є обовя`зковим полем  '),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, 'Номер має включати +380 та 9 цифр')
    .required('Номер телефону є обовя`зковим полем  '),
  password: yup
    .string()
    .min(8, 'Пароль має складатись мінімум з 8 символів')
    .matches(/\d/, 'Пароль має містити хоча б одну цифру')
    .required("Пароль обов'язковий"),
  confirmPassword: yup
    .string()
    .required("Підтвердження пароля обов'язкове")
    .oneOf([yup.ref('password')], 'Паролі не співпадають'),
  address: yup.object({
    country: yup
      .string()
      .oneOf(['uk', 'pl', 'gr', 'another'])
      .required("Країна обов'язкове поле"),

    city: yup.string().required("Місто обов'язкове"),

    postalCode: yup
      .string()
      .required("Поштовий індекс обов'язковий")
      .matches(/^\d+$/, 'Мають бути тільки цифри'),
  }),

  birthDate: yup.date().required("Дата народження обов'язкове поле"),

  sex: yup
    .string()
    .oneOf(['male', 'female', 'another'])
    .required("Стать обов'язкове поле"),
  hobbies: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          'reading',
          'films',
          'sport',
          'music',
          'cooking',
          'traveling',
          'videogames',
          'another',
        ]),
    )
    .min(2, 'Оберіть мінімум 2 хобі'),
  description: yup.string().max(300, 'Максимум 300 символів'),

  agreement: yup
    .boolean()
    .required('Ви повинні погодитись з умовами')
    .oneOf([true], 'Будь ласка, підтвердіть згоду з умовами'),
});

export const UserForm = () => {
  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    formikHelpers.resetForm();
  };
  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className={css.form}>
            <fieldset className={css.fieldset}>
              <legend className={css.legend}> Особисті дані</legend>
              <label className={css.label}>
                Введіть ім'я:
                <Field type="text" name="name" className={css.input} />
                <ErrorMessage name="name" className={css.error} component="p" />
              </label>
              <label className={css.label}>
                Введіть прізвище:
                <Field type="text" name="surname" className={css.input} />
                <ErrorMessage
                  name="surname"
                  className={css.error}
                  component="p"
                />
              </label>
              <label className={css.label}>
                Введіть електронну пошту:
                <Field type="email" name="email" className={css.input} />
                <ErrorMessage
                  name="email"
                  className={css.error}
                  component="p"
                />
              </label>
              <label className={css.label}>
                Введіть номер телефону:
                <Field type="text" name="phone" className={css.input} />
                <ErrorMessage
                  name="phone"
                  className={css.error}
                  component="p"
                />
              </label>
            </fieldset>
            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Облікові дані</legend>
              <label className={css.label}>
                Введіть пароль:
                <Field type="password" name="password" className={css.input} />
                <ErrorMessage
                  name="password"
                  className={css.error}
                  component="p"
                />
              </label>
              <label className={css.label}>
                Підтвердіть пароль:
                <Field
                  type="password"
                  name="confirmPassword"
                  className={css.input}
                />
                <ErrorMessage
                  name="confirmPassword"
                  className={css.error}
                  component="p"
                />
              </label>
            </fieldset>
            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Адреса</legend>
              <label className={css.label}>
                Введіть країну:
                <Field
                  as="select"
                  name="address.country"
                  className={css.select}
                >
                  <option value="uk">Україна</option>
                  <option value="pl">Польша</option>
                  <option value="gr">Німеччина</option>
                  <option value="another">Інше</option>
                </Field>
                <ErrorMessage
                  name="address.country"
                  className={css.error}
                  component="p"
                />
              </label>
              <label className={css.label}>
                Введіть місто:
                <Field type="text" name="address.city" className={css.input} />
                <ErrorMessage
                  name="address.city"
                  className={css.error}
                  component="p"
                />
              </label>
              <label className={css.label}>
                Введіть поштовий індекс:
                <Field
                  type="text"
                  name="address.postalCode"
                  className={css.input}
                />
                <ErrorMessage
                  name="address.postalCode"
                  className={css.error}
                  component="p"
                />
              </label>
            </fieldset>
            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Додаткова інформація</legend>
              <label className={css.label}>
                Введіть дату народження:
                <Field type="date" name="birthDate" className={css.input} />
                <ErrorMessage
                  name="birthDate"
                  className={css.error}
                  component="p"
                />
              </label>
              <p className={css.label}>Введіть стать:</p>
              <label className={css.radioLabel}>
                <Field type="radio" value="male" name="sex" />
                Чоловіча
              </label>
              <label className={css.radioLabel}>
                <Field type="radio" value="female" name="sex" />
                Жіноча
              </label>
              <label className={css.radioLabel}>
                <Field type="radio" value="another" name="sex" />
                Інше
              </label>
              <ErrorMessage name="sex" className={css.error} component="p" />
              <label className={css.label}>
                Введіть хобі:
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="reading" name="hobbies" />
                  Читання
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="films" name="hobbies" />{' '}
                  Перегляд фільмів / серіалів
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="sport" name="hobbies" /> Спорт
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="music" name="hobbies" /> Музика
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="cooking" name="hobbies" />
                  Кулінарія
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="traveling" name="hobbies" />
                  Подорожі
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="videogames" name="hobbies" />
                  Відеоігри
                </label>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" value="another" name="hobbies" /> Інше
                </label>
                <ErrorMessage
                  name="hobbies"
                  className={css.error}
                  component="p"
                />
              </label>
              <label className={css.label}>
                <span>Про себе: </span>
                <Field
                  as="textarea"
                  name="description"
                  className={css.textarea}
                />
                <ErrorMessage
                  name="description"
                  className={css.error}
                  component="p"
                />
              </label>
            </fieldset>
            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Погодження</legend>
              <label className={css.label}>
                <Field type="checkbox" name="agreement" /> Я погоджуюсь з
                умовами
                <ErrorMessage
                  name="agreement"
                  className={css.error}
                  component="p"
                />
              </label>
            </fieldset>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty}
            >
              Відправити
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
