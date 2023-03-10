import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }
}
