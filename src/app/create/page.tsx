"use client";
import { useGetExperienceCreationDataQuery } from "@/api";
import DatePicker from "@/components/Global/Form/DatePicker";
import Form from "@/components/Global/Form/FormWrapper";
import { NumberInput } from "@/components/Global/Form/NumberInput";
import TrashIcon from "@/components/Global/Icons/TrashIcon";
import { baseUrl, create_exp_form_validation_schema } from "@/constants";
import { FieldArray, FormikProps } from "formik";
import { useCallback, useEffect, useRef } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toPersianDigits } from "@/utils/locale";
import TextField from "@/components/Global/Form/TextField";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Typography,
  TextField as MUITextField,
} from "@mui/material";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "./create.slice";
import { useRouter } from "next/navigation";
import Autocomplete from "@/components/Global/Form/Autocomplete";

export default function ExperienceForm() {
  const formValues = useSelector((state: RootState) => state.createExp.form);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = useCallback(
    (data: typeof formValues) => {
      console.log(data);
      dispatch(setFormValues(data));
      router.push("/create/confirm");
    },
    [dispatch, router]
  );
  const { data, isLoading } = useGetExperienceCreationDataQuery();

  useEffect(() => {
    const now = new DateObject({ calendar: persian, locale: persian_fa });
    now.add(1, "day");
    while (now.weekDay.index !== 0) {
      now.add(1, "day");
    }
    now.setHour(9).setMinute(0).setSecond(0);
    formikRef.current?.setFieldValue(
      "sessions[0].publishTime.date",
      now.format()
    );
    formikRef.current?.setFieldValue(
      "sessions[0].publishTime.time",
      toPersianDigits("9:00")
    );
  }, []);

  const formikRef = useRef<FormikProps<typeof formValues>>(null);

  const getVenue = useCallback(
    (venueId: number) => {
      return data?.result.venues.find((venue) => venue.id === venueId);
    },
    [data?.result.venues]
  );
  const getDirector = useCallback(
    (directorId: string) => {
      return data?.result.directors.find(
        (director) => director.userId === directorId
      );
    },
    [data?.result.directors]
  );

  return (
    <div className="mx-auto max-w-3xl mt-5 md:border-1 border-gray-400 rounded-sm">
      <Form
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={create_exp_form_validation_schema}
        loading={isLoading}
        formikRef={formikRef}
        classNames={{ form: "grid grid-cols-12 gap-4" }}
      >
        {({ values, setFieldValue }) => (
          <>
            <TextField
              name="title"
              label="تیتر"
              className="md:col-span-4 col-span-12"
            />
            <TextField
              className="md:col-span-8 col-span-12"
              name="description"
              label="توضیحات"
              maxChar={400}
              minRows={3}
              multiline
            />
            <TextField
              name="category.id"
              label="دسته بندی"
              select
              className="col-span-12 sm:col-span-6"
              onChange={(val) => {
                setFieldValue("category.id", val.target.value);
                setFieldValue(
                  "category.title",
                  data?.result.categories.find(
                    (cat) => cat.id === Number(val.target.value)
                  )?.title || ""
                );
              }}
            >
              <MenuItem value={-1} />
              {data?.result.categories.map((cat) => (
                <MenuItem key={`cat-${cat.title}`} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </TextField>
            <FieldArray name="faqs">
              {({ push, remove }) => (
                <div className="col-span-12">
                  <h3>پرسش های پر تکرار (FAQ)</h3>
                  {values.faqs.map((_: any, index: number) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="mb-2">
                        <TextField
                          name={`faqs[${index}].question`}
                          label="سوال"
                          placeholder="سوال را وارد کنید"
                        />
                      </div>
                      <div className="mb-2">
                        <TextField
                          multiline
                          rows={3}
                          name={`faqs[${index}].answer`}
                          placeholder="پاسخ را وارد کنید"
                          label="پاسخ"
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-sm text-red-600 mt-1"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  ))}

                  <Button onClick={() => push({ question: "", answer: "" })}>
                    افزودن FAQ
                  </Button>
                </div>
              )}
            </FieldArray>
            <FieldArray name="sessions">
              {() =>
                values.sessions.map((_: any, index: number) => (
                  <div
                    key={`sessions[${index}]`}
                    className="col-span-12 grid grid-cols-12 gap-4"
                  >
                    <NumberInput
                      name={`sessions[${index}].price`}
                      label="هزینه (تومان)"
                      classNames={{ wrapper: "col-span-12 sm:col-span-6" }}
                    />
                    <NumberInput
                      name={`sessions[${index}.capacity]`}
                      label="ظرفیت (نفر)"
                      classNames={{ wrapper: "col-span-12 sm:col-span-6" }}
                    />
                    <DatePicker
                      name={`sessions[${index}.time]`}
                      label="زمان شروع"
                      classNames={{ wrapper: "col-span-12 sm:col-span-6" }}
                    />
                    <TextField
                      name={`sessions[${index}].duration`}
                      label="مدت زمان تجربه (ساعت)"
                      className="col-span-12 sm:col-span-6"
                      type="number"
                    />
                    <TextField
                      multiline
                      rows={3}
                      name={`sessions[${index}].description`}
                      label="توضیحات"
                      className="col-span-12 md:col-span-6"
                    />
                    <Autocomplete
                      name={`sessions[${index}].categories`}
                      className="col-span-12 md:col-span-6"
                      multiple
                      options={data?.result.inclusions || []}
                      getOptionLabel={(option) => option.title}
                      defaultValue={[]}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <MUITextField
                          {...params}
                          label="آنچه در این تجربه ارائه میشود"
                        />
                      )}
                    />
                    <TextField
                      name={`sessions[${index}.groupLink]`}
                      label="لینک گروه تلگرامی"
                      dir="ltr"
                      className="col-span-12 md:col-span-6"
                    />
                    <TextField
                      name={`sessions[${index}].publishTime.date`}
                      label="روز انتشار"
                      disabled
                      className="col-span-12 sm:col-span-6"
                    />
                    <TextField
                      name={`sessions[${index}].publishTime.time`}
                      label="ساعت انتشار"
                      disabled
                      className="col-span-12 sm:col-span-6"
                    />
                    {data?.result && (
                      <TextField
                        name={`sessions[${index}].director.userId`}
                        label="تجربه گردان"
                        select
                        className="col-span-12 sm:col-span-6"
                        onChange={(e) => {
                          const directorId = String(e.target.value);
                          setFieldValue(
                            `sessions[${index}].director.userId`,
                            directorId
                          );

                          const director = getDirector(directorId);
                          setFieldValue(
                            `sessions[${index}].director.name`,
                            director?.name ?? ""
                          );
                          setFieldValue(
                            `sessions[${index}].director.bio`,
                            director?.bio ?? ""
                          );
                          setFieldValue(
                            `sessions[${index}].director.photoUrl`,
                            director?.photoUrl ?? ""
                          );
                        }}
                      >
                        <MenuItem value={-1}></MenuItem>
                        {data?.result.directors.map((director) => (
                          <MenuItem
                            key={`directors-${director.name}`}
                            value={director.userId}
                          >
                            {director.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    {values.sessions[index].director?.userId && (
                      <Card
                        sx={{ display: "flex" }}
                        className="col-span-12 sm:col-span-6"
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 151 }}
                          image={`${
                            baseUrl +
                              values.sessions[index].director.photoUrl || ""
                          }`}
                          alt={`تصویر ${values.sessions[index].director.name}`}
                        />
                        <div className="flex flex-col">
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h5">
                              {values.sessions[index].director.name || ""}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              component="div"
                              sx={{ color: "text.secondary" }}
                            >
                              {values.sessions[index].director.bio || ""}
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                    )}
                    {data?.result && (
                      <TextField
                        name={`sessions[${index}].venue.id`}
                        label="محل برگزاری"
                        select
                        className="col-span-12 sm:col-span-6"
                        onChange={(e) => {
                          const venueId = Number(e.target.value);
                          setFieldValue(`sessions[${index}].venue.id`, venueId);

                          const venue = getVenue(venueId);
                          setFieldValue(
                            `sessions[${index}].venue.title`,
                            venue?.title ?? ""
                          );
                          setFieldValue(
                            `sessions[${index}].venue.address`,
                            venue?.address ?? ""
                          );
                        }}
                      >
                        <MenuItem value={-1}></MenuItem>
                        {data?.result.venues.map((venue) => (
                          <MenuItem
                            key={`venue-${venue.title}`}
                            value={venue.id}
                          >
                            {venue.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    <TextField
                      label="محله"
                      name={`sessions[${index}].venue.title`}
                      disabled
                      className="col-span-12 sm:col-span-6"
                      value={
                        getVenue(values.sessions[index].venue.id)?.title || ""
                      }
                    />
                    <TextField
                      label="آدرس"
                      name={`sessions[${index}].venue.address`}
                      disabled
                      value={
                        getVenue(values.sessions[index].venue.id)?.address || ""
                      }
                      className="col-span-12 sm:col-span-6"
                    />
                  </div>
                ))
              }
            </FieldArray>
            <Button
              onClick={() => {
                formikRef.current?.submitForm();
                console.log(formikRef.current?.values);
                console.log(formikRef.current?.errors);
              }}
            >
              ثبت
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}
