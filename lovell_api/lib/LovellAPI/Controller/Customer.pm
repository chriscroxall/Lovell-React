package LovellAPI::Controller::Customer;
use Mojo::Base 'Mojolicious::Controller';

sub login {
  my $self = shift;

  my $email = $self->param("email");
  my $pass  = $self->param("pass");

  my $data;
  if ($email eq 'test@test.com' && $pass eq 'test') {
    $data = $self->db->selectrow_hashref("select * from customers where customerid=343701");

    # Let's be fancy and use a session 
    # $self->session->{CustomerID} = 343701;
    $self->render( status => 200, json => $data );
    return 1;
  }

  $self->render( text => "You aren't authorized.", status => 401 );
  return undef;
}

sub enforceLogin {
  my $self = shift;

  if (!$self->session("CustomerID")) {
    $self->render( text => "You aren't authorized.", status => 401 );
    return undef;
  }

  return 1;
}

sub fromID {

}

sub fromVisit {

}

1;