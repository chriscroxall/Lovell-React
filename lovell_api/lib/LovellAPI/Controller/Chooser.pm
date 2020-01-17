package LovellAPI::Controller::Chooser;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::Log;
#use Mojo::Pg::Results;

sub chooser {
  my $self      = shift;
  my $log = Mojo::Log->new;

  #print ("sgdrg");
  #my $gender = $self->params("Gender");
  # $self->render( text => "not authorized", status => 401 );
  # return;
  # my $test = "testing";
  # $self->render( text => $test, status => 401 );
  # return;  
  my $db = $self->db;

  my $where = ""; 
 
  my $itemType = $self->param("Item Type");
  my $colour = $self->param("Colour");
  my $gender = $self->param("Gender");
  my $siteCode = $self->param("siteCode");
  my $brand = $self->param("Brand");


  #products based
  if($itemType)
    {
    $where .= qq[ products.itemtype='$itemType' and];
    }
  if($gender eq "mens")
    {
    $where .= qq[ products.agegroup='adult' and gender='male' and];
    }
  elsif( $gender eq "womens")
    {
    $where .= qq[ products.agegroup='adult' and gender='female' and];
    }
  elsif( $gender eq "kids")
    {
    $where .= qq[ products.agegroup='kids' and];
    }
  elsif( $gender eq "adult")
    {
    $where .= qq[ products.agegroup='adult' and];
    }
  if($brand){
    $where .= qq[products.brand = $brand and];
  }

  #tag based
  if($colour)
    {
    $where .= qq[ tags.tagType='Colour' and tags.tagText='$colour' and];
    }
  
  #stocklines_site based
  if($siteCode)
    {
    $where .= qq[ (stocklines_Site.inStock + stocklines_Site.ForwardOrder -stocklines_Site.Allocated) > 0 and stocklines_site.siteCode = '$siteCode'  and];
    }
  

  $where =~ s{and$}{};

  if($where)
    {
    $where = "where".$where;
    }
  $log->info($where);
  
  my $bool = $db->ping;
  # $log->debug('Not sure what is happening here');
  $log->info("SELECT * FROM products join producttags using(productID) join tags using(tagID) $where");
  
  # $log->warn('This might be a problem');
  # $log->error('Garden variety error');
  # $log->fatal('Boom');
 
  


  my $results = $db->selectall_hashref("SELECT * FROM products join producttags using(productID) join tags using(tagID) join stocklines_site using(productID) $where", "ProductID");
  $log->info($results);
  #results.map
  #return;
  #$self->render( text => $test, status => 401 );


  $self->render( json => $results);


  # my $ProductID = '1747';#$self->stash("ProductID");

  # $self->render( json => $self->db->selectrow_hashref(
  #   "SELECT * FROM products WHERE ProductID=?",
  #   {},
  #   $ProductID)
  # );
}


1;