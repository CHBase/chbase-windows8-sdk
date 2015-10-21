// (c) Microsoft. All rights reserved

using CHBase.Foundation;
using System.Xml.Serialization;

namespace CHBase.Types
{
    public sealed class CreateRecordResponse : IHealthVaultType
    {
        public CreateRecordResponse()
        {
        }

        [XmlElement("record-id", Order = 1)]
        public string RecordId
        {
            get;
            set;
        }

        public void Validate()
        {
            RecordId.ValidateRequired("RecordId");
        }
    }
}
