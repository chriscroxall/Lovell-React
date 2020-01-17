package LovellAPI;
use Mojo::Base 'Mojolicious';

use Mojolicious::Plugin::Database;
use LovellAPI::Core::Config;

# This method will run once at server start
sub startup {
  my $app = shift;
  $app->mode("development");

  $app->config(
      hypnotoad => {
          listen => [ 'http://127.0.0.1:5001/' ],
          proxy  => 1,
      },
  );

  # Set for Apache proxy mode. May not make it to production.
  $ENV{MOJO_REVERSE_PROXY} = 1;

  # Load configuration from hash returned by config file
  $app->helper('config', sub {
    my $config = LovellAPI::Core::Config->new();
    $config->load('/aes/machine.txt');
    return $config;
  });

  # Set secret token (used for session auth etc)
  $app->secrets($app->config->{encryption});

  # Database instance for this worker
  $app->plugin("database", {
    options   =>    {
      AutoCommit => 1
    },
    dsn       =>    'dbi:mysql:database=lovelldev;host=localhost;port=3306',
    username  =>    'lovelldev',
    password  =>    'polzeath',
    helper    =>    'db'
  });
 
  ### Router ###
  my $r = $app->routes; 

  # Types 
  $r->add_type(NumericID      => qr/\d+/);
  $r->add_type(String         => qr/[\w\_\-]+/);
  
  # Index
  $r->get('/')                                ->to('example#welcome');

  # Authentication
  $r->get('/login')                           ->to('customer#login');

  # Products
  $r->get('/product/<ProductID:NumericID>')   ->to('product#fromID');
  $r->get('/product/<ProductName:String>')    ->to('product#fromName');

  #Chooser
  $r->get('/chooser')                         ->to('chooser#chooser');
  #$r->post('/chooser')                        ->to('chooser#chooser');
  

  # Actions requiring customer login
  my $customerLoggedIn = $r->under("/")->to("customer#enforceLogin");
  $customerLoggedIn->get("/order/<OrderID:NumericID>")->to('order#fromID');
}

1;
