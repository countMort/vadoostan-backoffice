import * as Yup from "yup";

export const hostName = "141.11.37.39";
export const baseUrl = "http://" + hostName;

export const categories = [
  {
    id: 1,
    title: "موسیقی",
  },
  {
    id: 2,
    title: "بازی",
  },
  {
    id: 3,
    title: "خلق",
  },
  {
    id: 4,
    title: "فیلم",
  },
  {
    id: 5,
    title: "آشپزی",
  },
];

export const create_exp_form_initial_values = {
  title: "",
  description: "",
  faqs: [
    {
      question: "",
      answer: "",
    },
  ],
  category: { id: -1, title: "" } as {
    id: number;
    title: string;
  },
  sessions: [
    {
      time: "",
      description: "",
      duration: 0,
      price: 0,
      capacity: 0,
      publishTime: {
        date: "",
        time: "",
      },
      groupLink: "",
      venue: {
        id: -1,
        title: "",
        address: "",
      },
      director: {
        userId: "",
        name: "",
        bio: "",
        photoUrl: "",
      },
      inclusions: [] as {
        id: number;
        title: string;
      }[],
    },
  ],
};

export const create_exp_form_validation_schema = Yup.object({
  title: Yup.string().required("تیتر الزامی است."),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  description: Yup.string()
    .min(10, "حداقل 10 کارکتر")
    .max(400, "تعداد کارکتر از 400 بیشتر نمی‌تواند باشد.")
    .required("توضیحات الزامی است."),
  category: Yup.object({
    id: Yup.number().required().not([-1], "دسته بندی قبیله مورد نیاز است."),
  }),
  faqs: Yup.array()
    .of(
      Yup.object({
        question: Yup.string().required("سوال نمی‌تواند خالی باشد."),
        answer: Yup.string().required("پاسخ نمی‌تواند خالی باشد."),
      })
    )
    .min(1, "حداقل یک پرسش پرتکرار مورد نیاز است."),
  sessions: Yup.array()
    .of(
      Yup.object({
        groupLink: Yup.string()
          .url("لینک معتبر نیست.")
          .required("لینک گروه مورد نیاز است."),
        duration: Yup.string().required("مدت زمان تجربه الزامی است."),
        time: Yup.string().required("تاریخ برگزاری مورد نیاز است."),
        venue: Yup.object({
          id: Yup.number()
            .required()
            .not([-1], "محل برگزاری تجربه مورد نیاز است."),
        }).required("محل برگزاری تجربه مورد نیاز است."),
        price: Yup.number()
          .required("هزینه جلسه مورد نیاز است.")
          .not([0], "هزینه جلسه مورد نیاز است."),
        capacity: Yup.number()
          .required("ظرفیت جلسه مورد نیاز است.")
          .not([0], "هزینه جلسه مورد نیاز است."),
        director: Yup.object({
          userId: Yup.string().required("تجربه‌گردان مورد نیاز است."),
        }),
      })
    )
    .min(1, "حداقل یک جلسه باید تعریف شود."),
});

export const time_format = "DD/MM/YYYY HH:mm:ss";
