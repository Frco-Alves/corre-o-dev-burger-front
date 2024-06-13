import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';    
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Logo from '../../assets/logo.svg';
import { LeftContainer } from '../Login/styles';
import api from '../../services/api';
import { Button, ErrorMessage } from '../../components';
import {
    Container,
    Form,
    InputContainer,
    RightContainer,
    Title
} from './styles';

export function Register() {
    const schema = Yup
        .object({
            name: Yup.string().required('O nome é obrigatório'),
            email: Yup.string()
                .email('Digite um e-mail valido')
                .required('O e-mail é obrigatório'),
            password: Yup.string()
                .min(6, 'A senha deve ter pelo menos 6 digítos')
                .required('Digite uma senha'),
            confirmPassword: Yup.string()
                .required('A senha é obrigatória')
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais!')
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
        try {
            const { status } = await api.post(
                'users',
                {
                    name: clientDate.name,
                    email: clientDate.email,
                    password: clientDate.password,
                },
                { validateStatus: () => true }
            )

            if (status == 201 || status == 200) {
                toast.success('Cadastro criado com sucesso');
            } else if(status == 409){
                toast.error('E-mail já cadastrado! Faça login para continuar');
            } else {
                throw new Error()
            }
        } catch (err) {
            toast.error('Falha no sistema! Tente novamente')
        }

    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='logo-devburger' />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Cadastre-se
                </Title>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label error={errors?.name?.message}>Nome</label>
                        <input type="text" {...register("name")}
                            error={errors?.name?.message} />
                        <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                    </InputContainer>

                    <InputContainer>
                        <label error={errors?.email?.message}>Email</label>
                        <input type="email" {...register("email")}
                            error={errors?.email?.message} />
                        <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                    </InputContainer>

                    <InputContainer>
                        <label error={errors?.password?.message}>Senha</label>
                        <input type="password" {...register("password")}
                            error={errors?.password?.message} />
                        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                    </InputContainer>

                    <InputContainer>
                        <label error={errors?.confirmPassword?.message}>Confirmar Senha</label>
                        <input type="password" {...register("confirmPassword")}
                            error={errors?.confirmPassword?.message} />
                        <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
                    </InputContainer>
                    <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>inscrever-se</Button>
                </Form>
                <p>
                    Já possui conta ?{' '}
                    <Link style={{color: 'white'}} to="/login">Clique aqui</Link>
                </p>
            </RightContainer>
        </Container>
    )
}












