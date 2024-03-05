<?php

class Reports
{

    private $connection;
    private $project_id;
    private $date;
    private $reports;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_project_id($project_id)
    {
        $this->project_id = $project_id;
    }

    public function set_date($date)
    {
        $this->date = $date;
    }

    public function lots_and_orders_by_project()
    {
        try {
            $sql = "
                (
                    select
                        projects.id,
                        projects.project,
                        lots.block, 
                        lots.lot,
                        orders.price,
                        orders.type,
                        orders.date,
                        count(payments.id) as payments_count,
                        owners.name,
                        owners.phone,
                        sum(payments.amount_in_progress) as amount_in_progress

                    from
                        projects
                    left join lots
                        on lots.project_id = projects.id
                    left join orders
                        on orders.lot_id = lots.id
                    left join owners
                        on owners.id = orders.owner_id
                    left join payments
                        on payments.order_id = orders.id
                    where 
                        projects.id =  $this->project_id
                        and orders.date <= '$this->date'
                    group by block, lot
                )
                union all
                (
                    select
                        projects.id,
                        projects.project,
                        lots.block, 
                        lots.lot,
                        orders.price,
                        orders.type,
                        orders.date,
                        null as payments_count,
                        owners.name,
                        owners.phone,
                        null as amount_in_progress
                    from
                        projects
                    left join lots
                        on lots.project_id = projects.id
                    left join orders
                        on orders.lot_id = lots.id
                    left join owners
                        on owners.id = orders.owner_id
                    where 
                        projects.id =  $this->project_id
                        and orders.date is null
                )";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function orders_and_payments_by_project()
    {
        try {
            $today = date("Y-m-d");
            $sql = "                
                    select      
                        projects.id,
                        projects.project,
                        lots.block, 
                        lots.lot,
                        owners.name,
                        owners.phone,
                        payments.type,
                        payments.number,
                        payments.due_date,
                        payments.amount_in_progress,
                        payments.amount - payments.amount_in_progress as balance,
                        case 
                            when payments.amount - payments.amount_in_progress = 0 then 'Pagado' 
                            when '$today' > payments.due_date then 'Vencido' 
                            else 'Pendiente' 
                        end as stage,
                        date_format(payments.due_date,'%Y-%m') as due_date_month
                    from
                        projects
                    left join lots
                        on lots.project_id = projects.id
                    left join orders
                        on orders.lot_id = lots.id
                    left join owners
                        on owners.id = orders.owner_id
                    left join payments
                        on payments.order_id = orders.id
                    where 
                        projects.id =  $this->project_id
                        and orders.date <= '$this->date'
                        and payments.amount - payments.amount_in_progress != 0
                        and payments.due_date != '0000-00-00'
                    order by payments.due_date asc";
            //echo $sql;
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function unsold_lots_by_proyect()
    {
        try {
            $today = date("Y-m-d");
            $sql = "                
                select
                    project,
                    count(case when orders_id is null then 1 end) as unsold_lots
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
                ) as base
                group by 1
                order by 2 desc
                limit 10
            ";
            //echo $sql;
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function balances_by_owner()
    {
        try {
            $today = date("Y-m-d");
            $sql = "                
                select
                    owners.name,
                    cast(payments.amount - payments.amount_in_progress as UNSIGNED) as balance
                from payments
                left join orders
                    on orders.id = payments.order_id
                left join owners
                    on owners.id = orders.owner_id
                order by payments.amount - payments.amount_in_progress desc
                limit 10
            ";
            //echo $sql;
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

}
