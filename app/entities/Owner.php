<?php

class Owner
{

    private $connection;
    private $table = "owners";
    private $id;
    private $document;
    private $name;
    private $phone;
    private $address;
    private $reference;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_document($document)
    {
        $this->document = $document;
    }

    public function set_name($name)
    {
        $this->name = $name;
    }

    public function set_phone($phone)
    {
        $this->phone = $phone;
    }

    public function set_address($address)
    {
        $this->address = $address;
    }

    public function set_reference($reference)
    {
        $this->reference = $reference;
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
                    document,
                    name,
                    phone,
                    address,
                    reference,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->document',
                    '$this->name',
                    '$this->phone',
                    '$this->address',
                    '$this->reference',
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
            $sql = "
                select *
                from $this->table";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function get()
    {
        try {
            $sql = "
                select *
                from $this->table
                where id = $this->id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function search($query)
    {
        try {
            $sql = "
                select *
                from $this->table
                where 
                    document like '%$query%'
                    or name like '%$query%'
                    or phone like '%$query%'
                    or address like '%$query%'
                    or reference like '%$query%'";
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
                    document = '$this->document',
                    name = '$this->name',
                    phone = '$this->phone',
                    address = '$this->address',
                    reference = '$this->reference',
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
