# Organization Subscription Entity

[Rolebase public API](../public-api.md)

The `org_subscription` entity represents a subscription associated with an organization in Rolebase. It tracks the subscription plan, payment status, and Stripe integration details.

## Fields

| Field Name             | Type                             | Description                                   | Default        |
| ---------------------- | -------------------------------- | --------------------------------------------- | -------------- |
| `id`                   | UUID                             | Unique identifier for the subscription        | Auto-generated |
| `orgId`                | UUID                             | Reference to the organization                 | Required       |
| `type`                 | Subscription_Plan_Type_Enum      | Type of subscription plan                     | Required       |
| `status`               | Subscription_Payment_Status_Enum | Current status of the subscription            | Required       |
| `stripeCustomerId`     | String                           | Stripe customer ID for billing                | Required       |
| `stripeSubscriptionId` | String                           | Stripe subscription ID for recurring payments | Optional       |

## Subscription Plan Types

The `type` field can have the following values:

- `Startup`: Basic plan for startups and small teams
- `Business`: Advanced plan for larger organizations

## Subscription Payment Status

The `status` field can have the following values:

- `active`: Subscription is active and paid
- `canceled`: Subscription has been canceled
- `incomplete`: Initial payment attempt failed
- `incomplete_expired`: Initial payment attempt failed and expired
- `past_due`: Payment is past due
- `paused`: Subscription is temporarily paused
- `trialing`: In trial period
- `unpaid`: Payment failed and subscription is unpaid

## Relationships

### Object Relationships

- `org`: The organization this subscription belongs to

## GraphQL Examples

### Query Organization Subscription

```graphql
query GetOrgSubscription($orgId: uuid!) {
  org_subscription(where: { orgId: { _eq: $orgId } }) {
    id
    type
    status
    org {
      name
    }
    stripeCustomerId
    stripeSubscriptionId
  }
}
```

## Permissions

The organization subscription entity has restricted access:

- Only organization owners can view subscription details
- Subscription management is handled through the Rolebase platform
- Direct modifications are restricted to system processes

## Notes

- Each organization can have only one subscription
- The `orgId` field is unique across all subscriptions
- The `stripeCustomerId` and `stripeSubscriptionId` fields are unique
- Subscription status is automatically updated based on Stripe webhook events
- Plan changes and payment updates are managed through the Rolebase platform interface
