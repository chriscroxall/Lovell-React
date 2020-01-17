package LovellAPI::Controller::Order;
use Mojo::Base 'Mojolicious::Controller';

sub fromID {
  my $self        = shift;
  my $OrderID     = $self->stash("OrderID");
  my $CustomerID  = $self->session("CustomerID");

  #$self->params("itemtype")

  my $orderData = $self->db->selectrow_hashref(
    "SELECT * FROM orders WHERE OrderID=?",
    {},
    $OrderID
  );

  if ($orderData) {
    if ($orderData->{CustomerID} eq $CustomerID) {
      $self->render( json => $orderData );
    } else {
      $self->render( text => "You aren't authorized.", status => 401 );
    }
  } else {
    $self->render( text => "Order not found.", status => 404 );
  }

  
}

1;