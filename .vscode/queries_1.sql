select
    project,
    /*case
        when orders_id is null then 'Sin vender'
        else 'vendido'
    end as estado,*/
    /*count(case when orders_id is not null then 1 end),
    count(lot_id),
    round(count(case when orders_id is not null then 1 end) / count(lot_id) * 100)*/
    count(case when orders_id is null then 1 end)
from 
(
    select
        projects.id,
        projects.project,
        lots.id as lot_id,
        lots.block,
        lots.lot,
        orders.id as orders_id
    from
        projects
    left join lots
        on lots.project_id = projects.id
    left join orders
        on orders.lot_id = lots.id
    where 
        projects.status = 1
        ##and projects.id in (2, 3)
) as base
group by 1
order by 2 desc
limit 10