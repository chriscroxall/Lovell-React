#!perl
package LovellAPI::Core::Config;

use Moo;

has _data => ( is => "ro" );

sub BUILDARGS {
  return { _data => {} };
}

sub get($) {
  my ($self, $keys) = @_;

  my $keys_arr = ( ref($keys) eq "ARRAY" ? \@{ $keys } : [ $keys ] );
  for my $i (0 .. @$keys_arr) {
    $keys_arr->[$i] = $self->_data->{$keys_arr->[$i]} || undef;
  }

  return ( @$keys_arr ? $keys_arr : $keys_arr->[0] );
}

sub load($) {
  my ($self, @filePaths) = @_;

  return 0 if (!@filePaths);

  foreach my $path (@filePaths) {
    open (CONF_FILE, "<", $path) or carp(sprintf(q[Unable to open config file %s!], $path));

    while (my $line = <CONF_FILE>) {
      next if ($line =~ m{^\s*(\#|//)});

      if ($line =~ m{^\s*([\w\\/\.]+)\s*:\s*([\w\\/\.]+)}) {
        $self->_data->{$1} = $2;
      }
    }

    close (CONF_FILE);
  }
}

1;