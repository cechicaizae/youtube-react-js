import React, { useEffect, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

import { dataEncrpt } from "../utils/data-encrypt";
import { dataDecrypt } from "../utils/data-decrypt";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const loginSubmit = (formData) => {
    const { email, isChecked } = formData;

    if (!!isChecked) {
      localStorage.setItem("email", dataEncrpt(email));
      localStorage.setItem("isChecked", isChecked);
    } else if (!isChecked) {
      localStorage.clear();
    }

    // here call the API to signup/login
    reset();
  };

  const checkRemenberMe = useCallback(() => {
    const isCheckedStorage = localStorage.getItem("isChecked");
    const emailStorage = localStorage.getItem("email");
    if (!!isCheckedStorage) {
      setValue("email", dataDecrypt(emailStorage), {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("isChecked", isCheckedStorage, { shouldDirty: true });
    }
  }, [setValue]);

  useEffect(() => {
    const isChecked = localStorage.getItem("isChecked");
    if (isChecked) checkRemenberMe();
  }, [checkRemenberMe]);

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <form autoComplete="off" onSubmit={handleSubmit(loginSubmit)}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-4">
            <h2> Aprendiendo React Hook Forms</h2>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                id="new-email"
                type="text"
                name="new-email"
                placeholder="introduzca su Email"
                autoComplete="new-email"
                className={errors?.email ? "p-invalid" : ""}
                {...register("email", {
                  required: {
                    value: true,
                    message: "el campo email es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message:
                      "el formato del email es incorrecto, por favor reviselo",
                  },
                })}
              />
              <label htmlFor="email">Email</label>
              {errors?.email && (
                <small className="p-error">{errors.email.message}</small>
              )}
            </span>
          </div>
          <div className="p-4"></div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                name="new-password"
                id="new-password"
                autoComplete="new-password"
                type="password"
                className={errors?.password ? "p-invalid" : ""}
                placeholder="introduzca su contrasena"
                {...register("password", {
                  required: {
                    value: true,
                    message: "el campo contrasena es obligatorio",
                  },
                  minLength: {
                    value: 6,
                    message: "la contrasena debe tener almenos 6 caracteres",
                  },
                })}
              />
              <label htmlFor="password">Contrasena</label>
              {errors?.password && (
                <small className="p-error">{errors.password.message}</small>
              )}
            </span>
          </div>
          <div className="p-field p-col-12 p-md-12 p-2">
            <input
              type="checkbox"
              id="remenberMe"
              name="remenberMe"
              {...register("isChecked")}
            />
            <label htmlFor="rememberMe" className="p-checkbox-label p-2">
              Recuerdame
            </label>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <Button
              type="submit"
              label="Ingresar"
              disabled={!isValid || !isDirty}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
