namespace Persistence.Interfaces.Entites
{
    public class PendingRequest : Request
    {
        public bool Verified { get; set; }
        public bool Notified { get; set; }

    }
}
