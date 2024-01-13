import { Router } from 'express'
import { service } from '../controlers/service-controller.js'

const router = Router()

router.route('/service').get(service)

export default router