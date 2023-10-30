<?php

class Payment
{

    private $connection;
    private $table = "payments";
    private $id;
    private $order_id;
    private $type;
    private $number;
    private $amount;
    private $due_date;
    private $amount_in_progress;
    private $last_payment_date;
    private $invoice;
    private $invoice_detail;
    private $comments;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_order_id($order_id)
    {
        $this->order_id = $order_id;
    }

    public function set_type($type)
    {
        $this->type = $type;
    }

    public function set_number($number)
    {
        $this->number = $number;
    }

    public function set_amount($amount)
    {
        $this->amount = $amount;
    }

    public function set_due_date($due_date)
    {
        $this->due_date = $due_date;
    }

    public function set_amount_in_progress($amount_in_progress)
    {
        $this->amount_in_progress = $amount_in_progress;
    }

    public function set_last_payment_date($last_payment_date)
    {
        $this->last_payment_date = $last_payment_date;
    }

    public function set_invoice($invoice)
    {
        $this->invoice = $invoice;
    }

    public function set_invoice_detail($invoice_detail)
    {
        $this->invoice_detail = $invoice_detail;
    }

    public function set_comments($comments)
    {
        $this->comments = $comments;
    }

    public function set_status($status)
    {
        $this->status = $status;
    }

    public function create()
    {
        try {
            $now = date("Y-m-d H:i:s");
            $sql = "
                insert into $this->table
                (
                    order_id,
                    type,
                    number,
                    amount,
                    due_date,
                    amount_in_progress,
                    last_payment_date,
                    invoice,
                    invoice_detail,
                    comments,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->order_id',
                    '$this->type',
                    '$this->number',
                    '$this->amount',
                    '$this->due_date',
                    '$this->amount_in_progress',
                    '$this->last_payment_date',
                    '$this->invoice',
                    '$this->invoice_detail',
                    '$this->comments',
                    '$this->status',
                    '$now',
                    '$now'
                )";
            $this->connection->query($sql);
            return $this->connection->lastInsertId();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function getAll()
    {
        try {
            $today = date("Y-m-d");
            $sql = "
                select
                    $this->table.id,
                    $this->table.order_id,
                    orders.lot_id,
                    $this->table.type,
                    $this->table.number,
                    $this->table.amount,
                    $this->table.due_date,
                    $this->table.amount_in_progress,
                    $this->table.amount - $this->table.amount_in_progress as balance,
                    case 
                        when $this->table.amount - $this->table.amount_in_progress = 0 then 'Pagado' 
                        when '$today' > $this->table.due_date then 'Vencido' 
                        else 'Pendiente' 
                    end as stage,
                    $this->table.last_payment_date,
                    $this->table.invoice,
                    $this->table.invoice_detail,
                    $this->table.comments,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join orders
                    on $this->table.order_id = orders.id";
            //echo $sql;
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function get()
    {
        try {
            $sql = "
                select 
                    $this->table.id,
                    $this->table.order_id,
                    orders.lot_id,
                    lots.project_id,
                    $this->table.type,
                    $this->table.number,
                    $this->table.amount,
                    $this->table.due_date,
                    $this->table.amount_in_progress,
                    $this->table.last_payment_date,
                    $this->table.invoice,
                    $this->table.invoice_detail,
                    $this->table.comments,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join orders
                    on $this->table.order_id = orders.id
                inner join lots
                    on orders.lot_id = lots.id
                inner join projects
                    on lots.project_id = projects.id
                where $this->table.id = $this->id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function getByOrderId($order_id)
    {
        try {
            $sql = "
                select 
                    $this->table.id,
                    $this->table.order_id,
                    $this->table.type,
                    $this->table.number,
                    $this->table.amount,
                    $this->table.due_date,
                    $this->table.amount_in_progress,
                    $this->table.last_payment_date,
                    $this->table.invoice,
                    $this->table.invoice_detail,
                    $this->table.comments,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join orders
                    on $this->table.order_id = orders.id
                where 
                    $this->table.order_id = $order_id
                order by $this->table.type asc, $this->table.number desc";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function update()
    {
        try {
            $now = date("Y-m-d H:i:s");
            $sql = "
                update $this->table
                set
                    order_id = '$this->order_id',
                    type = '$this->type',
                    number = '$this->number',
                    amount = '$this->amount',
                    due_date = '$this->due_date',
                    amount_in_progress = '$this->amount_in_progress',
                    last_payment_date = '$this->last_payment_date',
                    invoice = '$this->invoice',
                    invoice_detail = '$this->invoice_detail',
                    comments = '$this->comments',
                    status = '$this->status',
                    updated_at = '$now'
                where id = $this->id";
            return $this->connection->query($sql)->rowCount();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function delete()
    {
        try {
            $sql = "
                delete from $this->table
                where id = $this->id";
            return $this->connection->query($sql)->rowCount();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }
}
