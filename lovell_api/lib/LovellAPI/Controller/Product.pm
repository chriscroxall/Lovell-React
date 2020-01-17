package LovellAPI::Controller::Product;
use Mojo::Base 'Mojolicious::Controller';

sub fromID {
  my $self      = shift;
  my $ProductID = $self->stash("ProductID");

  $self->render( json => $self->db->selectrow_hashref(
    "SELECT * FROM products WHERE ProductID=?",
    {},
    $ProductID)
  );
}

sub fromName {
  my $self        = shift;
  my $ProductName = $self->stash("ProductName");

  $self->render( json => $self->db->selectrow_hashref(
    "SELECT * FROM products WHERE ProductName=?",
    {},
    $ProductName)
  );
  
}

1;