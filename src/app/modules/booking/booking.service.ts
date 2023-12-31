import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { convertToIsoDate } from '../../../shared/utils';
import { bookingSearchableFields } from './booking.constant';
import { IBookingFilterRequest } from './booking.interface';

const insertIntoDB = async (
    username: string,
    payload: Booking,
): Promise<Booking> => {
    const { date } = payload;
    const customer = await prisma.customer.findUnique({
        where: {
            username,
        },
    });

    if (!customer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
    }

    const result = await prisma.booking.create({
        data: {
            ...payload,
            date: convertToIsoDate(String(date)),
            customerId: customer?.id,
            status: 'pending',
        },
    });
    return result;
};

const getAllFromDB = async (
    filters: IBookingFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Booking[] | null>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, username, ...filterData } = filters;

    const andConditions = [];

    if (username) {
        andConditions.push({
            customer: {
                username: {
                    equals: username,
                },
            },
        });
    }

    if (searchTerm) {
        andConditions.push({
            OR: bookingSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.BookingWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.booking.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            service: {
                select: {
                    title: true,
                },
            },
            customer: {
                select: {
                    username: true,
                    email: true,
                    contactNo: true,
                },
            },
        },
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      id: 'desc',
                  },
    });
    const total = await prisma.booking.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

const getSingleFromDB = async (id: string): Promise<Booking | null> => {
    const result = await prisma.booking.findUnique({
        where: {
            id,
        },
        include: {
            service: {
                select: {
                    title: true,
                },
            },
            customer: {
                select: {
                    username: true,
                    email: true,
                    contactNo: true,
                },
            },
        },
    });
    return result;
};

const updateInDB = async (
    id: string,
    payload: Booking,
): Promise<Booking | null> => {
    const { date, ...data } = payload;

    const updatedBookingData: Partial<Booking> = { ...data };

    if (date) {
        updatedBookingData.date = convertToIsoDate(
            date as unknown as string,
        ) as unknown as Date;
    }

    const result = await prisma.booking.update({
        where: {
            id,
        },
        data: updatedBookingData,
    });
    return result;
};

const deleteFromDB = async (id: string): Promise<Booking | null> => {
    const result = await prisma.booking.delete({
        where: {
            id,
        },
    });
    return result;
};

export const BookingService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateInDB,
    deleteFromDB,
};
