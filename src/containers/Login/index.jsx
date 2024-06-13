import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useUser } from '../../hooks/UserContext';
//import Pizza from '../../assets/pizzaria-logo.jpg';

import Logo from '../../assets/logo.svg';
import { LeftContainer } from '../Login/styles';
import { RightContainer } from '../Login/styles'
import { Button, ErrorMessage } from '../../components';
import api from '../../services/api';
import {
    Container,
    Form,
    InputContainer,
    Title
} from './styles';

export function Login() {
    const history = useHistory

    const { putUserData } = useUser()
    const schema = Yup
        .object({
            email: Yup.string()
                .email('Digite um e-mail valido')
                .required('O e-mail é obrigatório'),
            password: Yup.string()
                .min(6, 'A senha deve ter pelo menos 6 digítos')
                .required('Digite uma senha'),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (clientDate) => {
        const { data } = await toast.promise(
            api.post('session', {
                email: clientDate.email,
                password: clientDate.password,
            }),
            {
                pending: 'Verificando seu dados',
                success: 'Seja bem-vindo(a) 👌',
                error: 'Verifique seu e-mail e senha 🤯'
            }
        )

        putUserData(data)

        setTimeout(() => {
            if (data.admin) {
                history.push('/pedidos')
            }else {
                history.push('/')
            }
            history.push('/')
        }, 1000);

    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='logo-devburger' />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu<span> Login e senha.</span>
                </Title>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")}
                            error={errors?.email?.message} />
                        <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")}
                            error={errors?.password?.message} />
                        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                    </InputContainer>
                    <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>Entrar</Button>
                </Form>
                <p>
                    Não possui conta? {' '}
                    <Link style={{ color: 'white' }} to="/cadastro">Clique aqui.</Link>
                </p>
            </RightContainer>
        </Container>
    )
}