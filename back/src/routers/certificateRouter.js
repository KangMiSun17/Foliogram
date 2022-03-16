import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { certificateService } from '../services/certificateService';

const certificateRouter = Router();

certificateRouter.post(
    '/certificates/create',
    login_required,
    async function (req, res, next) {
        try {
            //if req.body is not exist,return Error message
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }

            // get informate from req
            const title = req.body.title;
            const description = req.body.description;
            const when_date = req.body.when_date;
            const user_id = req.currentUserId;

            // add a certificate with new information
            const newCertificate = await certificateService.addCertificate({
                title,
                description,
                when_date,
                user_id,
            });

            res.status(201).json(newCertificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.get(
    '/certificates/:id',
    login_required,
    async function (req, res, next) {
        try {
            //get id from req.params
            const id = req.params.id;
            //get one certificate with id of certificate
            const certificate = await certificateService.getCertificate({ id });
            //if certificate is not exist,return error message
            if (certificate.errorMessage) {
                throw new Error(certificate.errorMessage);
            }
            res.status(200).send(certificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.get(
    '/certificatelist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            //get id of user from req.params
            const user_id = req.params.user_id;
            //get user's certificates with id of user
            const certificates = await certificateService.getCertificates({
                user_id,
            });
            res.status(200).send(certificates);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.delete(
    '/certificates/:id',
    login_required,
    async function (req, res, next) {
        try {
            //get id of certificate from req.params
            const id = req.params.id;
            //get user's certificates with id of user
            const result = await certificateService.deleteCertificate({
                id,
            });
            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.put(
    '/certificates/:id',
    login_required,
    async function (req, res, next) {
        try {
            //get information from req
            const id = req.params.id;
            const title = req.body.title ?? null;
            const description = req.body.description ?? null;
            const when_date = req.body.when_date ?? null;
            const toUpdate = { title, description, when_date };

            //update get one certificate with id of certificate
            const updatedCertificate = await certificateService.setCertificate({
                id,
                toUpdate,
            });
            //if certificate is not exists,return error message
            if (updatedCertificate.errorMessage) {
                throw new Error(updatedCertificate.errorMessage);
            }
            res.status(200).send(updatedCertificate);
        } catch (error) {
            next(error);
        }
    }
);

export { certificateRouter };
