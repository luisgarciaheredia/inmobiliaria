select
    owners.name,
    payments.amount - payments.amount_in_progress as balance
from payments
left join orders
    on orders.id = payments.order_id
left join owners
    on owners.id = orders.owner_id
order by payments.amount - payments.amount_in_progress desc
LIMIT 10