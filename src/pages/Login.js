// ** React Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useSkin } from "@hooks/useSkin";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { ArrowRight, Facebook, GitHub, Mail, Twitter } from "react-feather";

// Core Imports
import { useLogin } from "../core/services/api/auth/useLogin";
import { getItem } from "../core/services/common/storage.services";
import { loginFormSchema } from "../core/validations/login-form.validation";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import ErrorMessage from "../@core/components/error-message";

// ** Reactstrap Imports
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import logo from "@src/assets/images/common/logo.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  // ** States
  const [isLoading, setIsLoading] = useState();

  // ** Hooks
  const navigate = useNavigate();

  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const loginUser = useLogin();

  const onSubmit = (data) => {
    setIsLoading(true);

    loginUser.mutate(data, {
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    const token = getItem("token");

    if (token) navigate("/");
  }, []);

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={logo} className="login-logo-image" />
          <h2 className="brand-text text-primary ms-1">نابغه</h2>
        </Link>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به نابغه خوش آمدید 👋
            </CardTitle>
            <CardText className="mb-2">
              برای ورود به پنل ادمین باید وارد سایت شوید !
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit((data) => onSubmit(data))}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل
                </Label>
                <Controller
                  id="login-email"
                  name="phoneOrGmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="شماره موبایل یا جیمیل"
                      invalid={errors.phoneOrGmail && true}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage>{errors?.phoneOrGmail?.message}</ErrorMessage>
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز عبور
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  invalid={errors.password && true}
                  {...register("password")}
                />
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </div>
              <div className="form-check mb-1">
                <Controller
                  id="rememberMe"
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Input type="checkbox" id="rememberMe" {...field} />
                  )}
                />
                <Label className="form-check-label" for="rememberMe">
                  مرا به خاطر بسپار
                </Label>
              </div>
              <Button
                color="primary"
                block
                className="d-flex justify-content-center align-items-center login-submit-button"
                disabled={isLoading}
              >
                {isLoading && <Spinner size="sm" className="loading-spinner" />}
                <span className="align-middle d-sm-inline-block d-none">
                  ورود
                </span>
              </Button>
            </Form>
            <div className="divider my-2">
              <div className="divider-text">یا</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
