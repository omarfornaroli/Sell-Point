
import { CartItemModel } from './cartItem';
import { CartItemSaleModel } from './cartItemSale';
import { CityModel } from './city';
import { ClientModel } from './client';
import { CourseModel } from './course';
import { CourseDateTimeModel } from './courseDateTime';
import { DateTimeModel } from './datetime';
import { DeviceModel } from './device';
import { DeviceTypeModel } from './deviceType';
import { EmployeeModel } from './employee';
import { EnterpriseModel } from './enterprise';
import { FeeModel } from './fee';
import { MenuItemModel } from './menuItem';
import { NotificationModel } from './notification';
import { PaymentTypeModel } from './paymentType';
import { ProductModel } from './product';
import { ProductCategoryModel } from './productCategory';
import { SaleModel } from './sale';
import { ServiceModel } from './service';
import { ServiceStatusModel } from './serviceStatus';
import { UserModel } from './user';
import { UserLevelModel } from './userLevel';

export const DAL = {
    CartItemModel,
    CartItemSaleModel,
    CityModel,
    ClientModel,
    CourseModel,
    CourseDateTimeModel,
    DateTimeModel,
    DeviceModel,
    DeviceTypeModel,
    EmployeeModel,
    EnterpriseModel,
    FeeModel,
    MenuItemModel,
    NotificationModel,
    PaymentTypeModel,
    ProductModel,
    ProductCategoryModel,
    SaleModel,
    ServiceModel,
    ServiceStatusModel,
    UserModel,
    UserLevelModel,
};

export type DALModelKeys = keyof typeof DAL;