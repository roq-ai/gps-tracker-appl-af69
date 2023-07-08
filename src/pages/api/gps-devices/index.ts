import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { gpsDeviceValidationSchema } from 'validationSchema/gps-devices';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGpsDevices();
    case 'POST':
      return createGpsDevice();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGpsDevices() {
    const data = await prisma.gps_device
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'gps_device'));
    return res.status(200).json(data);
  }

  async function createGpsDevice() {
    await gpsDeviceValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.gps_data?.length > 0) {
      const create_gps_data = body.gps_data;
      body.gps_data = {
        create: create_gps_data,
      };
    } else {
      delete body.gps_data;
    }
    const data = await prisma.gps_device.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
